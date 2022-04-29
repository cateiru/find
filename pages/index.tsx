import type {NextPage} from 'next';
import Title from '../components/Common/Title';
import Home from '../components/Home/Home';

const Index: NextPage = () => {
  return (
    <Title name="ふぁいんど！">
      <Home />
    </Title>
  );
};

export default Index;
