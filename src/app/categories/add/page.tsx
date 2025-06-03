// app/categories/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/categories", {
            method: "POST",
            body: JSON.stringify({ name, description }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            router.push("/categories");
        } else {
            alert("Failed to create category.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Add New Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
