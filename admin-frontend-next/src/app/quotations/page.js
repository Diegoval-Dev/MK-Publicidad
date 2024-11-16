import Accepted from "@components/quotes/accepted";
import Finished from "@components/quotes/finished";
import Pending from "@components/quotes/pending";
import Rejected from "@components/quotes/rejected";
import Sended from "@components/quotes/sended";
import Quotations from "@components/dashboard/quotations"

export default function Quotes() {
  return (
    <div className='py-8'>
      <h1 className='centered-title'>Cotizaciones</h1>
      <Quotations />
    </div>
  )
}