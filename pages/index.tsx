import type { NextPage } from 'next';
import { selectUserData } from '@Redux/slices/user';
import { useAppSelector } from '@Redux/hooks';

const Home: NextPage = () => {
  const userData = useAppSelector(selectUserData);

  return <h1>Hello {userData?.user.username}</h1>;
};

export default Home;
