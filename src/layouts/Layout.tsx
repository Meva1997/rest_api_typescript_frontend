import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">Product Administrator</h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        <Outlet /> {/* This Outlet component will render the child routes defined in the router configuration */}
      </main>
    </>
  )
}
