import "./index.scss"

const TemplateCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="template-catalog">
      {children}
    </div>
  )
}

export default TemplateCards