import HostPageLayout from '../HostPageLayout';
import SummaryComponent from '../../../components/van-list-host/SummaryComponent';
import ReviewSummary from '../../../components/van-list-host/ReviewSummary';
import VanListSummary from '../../../components/van-list-host/VanListSummary';
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
