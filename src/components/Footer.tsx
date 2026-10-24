import { Launch } from "@mui/icons-material"

const Footer = () => {

  return <div className="w-full flex flex-row items-center justify-center gap-1 opacity-65 p-3 text-sm text-center">
    Made with love <span className="font-mono leading-none">(and no generative AI)</span> by
    <a
      target='_blank'
      rel='noopener noreferrer'
      href="https://kenzie.ink"
      className="underline inline-flex flex-row items-center justify-center"
    >
      Kenzie Bottoms
      <Launch className="ml-1" fontSize="small" />
    </a>
    <span className="opacity-50">&bull;</span>
    <a
      target='_blank'
      rel='noopener noreferrer'
      href="https://github.com/kenziebottoms/ficsheet"
      className="underline inline-flex flex-row items-center justify-center"
    >
      source on GitHub

      <Launch className="ml-1" fontSize="small" />
    </a>
  </div>
}

export default Footer