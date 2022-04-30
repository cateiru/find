import type {NextPage} from 'next';
import NoSSR from 'react-no-ssr';
import Title from '../components/Common/Title';
import Connect from '../components/Connect/Connect';

const ConnectPage: NextPage = () => {
  return (
    <Title name="ふぁいんど！">
      <NoSSR>
        <Connect />
      </NoSSR>
    </Title>
  );
};

export default ConnectPage;
