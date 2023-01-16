import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Htag, Button, Ptag, Tag, Rating } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance='primary' className='cool' onClick={() => setCounter(counter + 1)}>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='down'>
        Кнопка
      </Button>
      <Ptag size='s'>KIjuvhsidvgu</Ptag>
      <Ptag size='m'>KIjuvhsidvgu</Ptag>
      <Ptag size='l'>KIjuvhsidvgu</Ptag>
      <Tag size='s' color='ghost'>
        kjush
      </Tag>
      <Tag size='m' color='red'>
        kjush
      </Tag>
      <Tag color='green'>kjush</Tag>
      <Tag size='m' color='primary'>
        kjush
      </Tag>
      <Rating rating={rating} />
      <Rating rating={rating} isEditable setRating={setRating} />
      {/* <ul>
        {" "}
        {menu.map((el, idx) => (
          <li key={idx}>{el._id.secondCategory}</li>
        ))}
      </ul> */}
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    { firstCategory }
  );

  return { props: { menu, firstCategory } };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
