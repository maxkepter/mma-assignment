import { GoogleGenerativeAI } from "@google/generative-ai";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";

const GEMINI_API_KEY = "AIzaSyDaGSS4SYlCkj5KolabY90U7J1y8S9cpQM";
const GEMINI_MODEL = "gemini-3.1-flash-lite-preview";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Gửi ảnh lên Gemini và lấy mô tả
 * @param {string} imageUri - Local URI của ảnh
 * @returns {Promise<string>} Mô tả ảnh
 */
export async function generateCaption(imageUri) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_actual_api_key_here") {
    return "⚠️ Vui lòng cấu hình GEMINI_API_KEY trong file .env";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL || "gemini-3.1-flash-lite-preview",
    });

    // Đọc ảnh dưới dạng base64
    const base64 = await readAsStringAsync(imageUri, {
      encoding: EncodingType.Base64,
    });

    const result = await model.generateContent([
      "Hãy mô tả ngắn gọn bức ảnh này bằng tiếng Việt trong 1-2 câu. Nếu có thể, hãy cho biết đây là cảnh gì, có gì đặc biệt trong ảnh.",
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64,
        },
      },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "⚠️ Không thể tạo mô tả cho ảnh này.";
  }
}
