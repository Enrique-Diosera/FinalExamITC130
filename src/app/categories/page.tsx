import { Category } from "@/types/category";

async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-slate-100 to-white min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-14">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 sm:mb-0">
          📂 Categories
        </h1>
        <a
          href="/categories/add"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-transform duration-300"
          aria-label="Add new category"
        >
          + Add Category
        </a>
      </header>

      {categories.length === 0 ? (
        <div className="text-center mt-24 text-gray-500 text-lg animate-pulse">
          📭 No categories found. Try adding one!
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              <header>
                <h2 className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors duration-200">
                  <a href={`/categories/${cat.id}`}>
                    {cat.name}
                  </a>
                </h2>
                <time
                  dateTime={cat.createdAt}
                  className="block text-sm text-gray-400 mt-2"
                >
                  {new Date(cat.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </header>

              <p className="text-gray-700 mt-4 mb-6 line-clamp-4 leading-relaxed">
                {cat.description?.length
                  ? (cat.description.length > 140
                      ? cat.description.slice(0, 140) + "..."
                      : cat.description)
                  : <span className="italic text-gray-400">No description available.</span>
                }
              </p>

              <footer>
                <a
                  href={`/categories/${cat.id}`}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                >
                  View details →
                </a>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
