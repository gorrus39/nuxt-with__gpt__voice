import { openai } from "~/server/utils/openai";

export default eventHandler(
  async (event): Promise<{ error?: string; answer?: string }> => {
    const rawQuestion = getQuery(event).question;

    const question = Array.isArray(rawQuestion)
      ? rawQuestion.join(" ")
      : String(rawQuestion || "").trim();

    if (!question) return { error: "Вопрос отсутствует" };

    let answer: string;
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: question }],
        model: "deepseek-chat",
      });
      const result = completion.choices[0].message.content;
      if (result) {
        answer = result;
      } else throw new Error("Ошибка. неожиданный ответ от чата. ");
    } catch (error) {
      return { error: String(error) };
    }

    return { answer };
  }
);
