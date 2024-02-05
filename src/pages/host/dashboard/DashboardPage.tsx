import HostPageLayout from '../HostPageLayout';
import SummaryComponent from './components/SummaryComponent';
import ReviewSummary from './components/ReviewSummary';
import VanListSummary from './components/VanListSummary';
export default function Dashboard() {
  //TODO: build out this component
  return (
    <HostPageLayout>
      <SummaryComponent />
      <ReviewSummary />
      <VanListSummary />
    </HostPageLayout>
  );
}
