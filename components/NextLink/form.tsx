import 'tailwindcss/tailwind.css'

export default function Form() {
  return (
    <div>
      <h1>Hello Baby</h1>
      <form>
        <input className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." />
        <button className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">
          Sign up
        </button>

        <button className="bg-red-500 hover:bg-red-700">
          Hover me
        </button>
      </form>

    </div>
  );
}
