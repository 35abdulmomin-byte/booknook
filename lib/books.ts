import type { Book } from "@/components/BookCard";

export async function getBook(id: string): Promise<Book | null> {
  // আইডি ভ্যালিড না হলে ফেচ করার আগেই রিটার্ন করুন
  if (!id || typeof id !== "string" || id.trim() === "" || id === "undefined" || id === "null") {
    return null;
  }

  const cleanId = id.trim();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${cleanId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404 || res.status === 400) return null;
      throw new Error(`Failed to fetch book: ${res.statusText}`);
    }

    const data = await res.json();
    
    // ব্যাকএন্ড থেকে আসা ডেটাতে আইডি প্রপার্টি নিশ্চিত করা
    return {
      ...data,
      _id: data._id || data.id,
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}