export default function Template(
  {h1,h2,p}:
  {h1:string,h2:string,p:string}
){
  return (
    <div className="hidden w-1/2 flex-col justify-center bg-[#145537] p-12 text-white md:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-[#145537]">
          S
        </div>
        <div className="text-2xl font-bold">{h1}</div>
      </div>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        {h2}
      </h1>
      <p className="text-lg text-blue-100">
        {p}
      </p>
    </div>
  )
}