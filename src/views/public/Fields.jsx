import HeroField from "../../components/HeroField"
import ListCardField from "../../components/ListCardField"
import "../../css/fields.css"



const Fields = () => {
  return (
    <div>
        <HeroField/>
        <section className="section-fields">
          <h2 className="text-center py-3 title">Nuestras canchas</h2>
          <ListCardField/>
        </section>
    </div>
  )
}

export default Fields