import type { NextPage } from 'next';
import { selectUserData } from '../redux/slices/user';
import { useAppSelector } from '../redux/hooks';

const Home: NextPage = () => {
  const userData = useAppSelector(selectUserData);

  return <h1>Hello {userData?.user.username}</h1>;
};

export default Home;
