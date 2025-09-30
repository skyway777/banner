import { Banner } from './components/Banner/Banner'
import './App.css';

function App() {
  return (
    <div>
      <Banner 
        title="Get the Business Funding You Need"
        text="Expand your business with a flexible loan tailored to your needs. Whether you're investing in new equipment, increasing inventory, or boosting cash flow, we offer quick approvals and competitive rates to keep your business growing."
        advantages={[
          'Fast approval process',
          'Flexible repayment terms',
          'Competitive interest rates'
        ]}
      />
    </div>
  )
}

export default App
