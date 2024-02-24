import HostPageLayout from '../HostPageLayout';
import SummaryComponent from './components/SummaryComponent';
import ReviewSummary from './components/ReviewSummary';
import VanListSummary from '../components/VanListSummary';
export default function Dashboard() {
  //TODO: build out this component
  return (
    <HostPageLayout>
      <div className='h-full'>
        <SummaryComponent />
        <ReviewSummary />
        <VanListSummary />
      </div>
    </HostPageLayout>
  );
}
