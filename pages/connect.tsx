import type {NextPage} from 'next';
import Title from '../components/Common/Title';
import Connect from '../components/Connect/Connect';

const ConnectPage: NextPage = () => {
  return (
    <Title name="ふぁいんど！">
      <Connect />
    </Title>
  );
};

export default ConnectPage;
