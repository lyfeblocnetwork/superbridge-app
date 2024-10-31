import { useRouter } from "next/router";

export const useSetQueryParam = () => {
  const router = useRouter();

  return (name: string, value: string) => {
    console.log(router.query);
    router.push(
      "/",
      {
        pathname: "/",
        query: {
          ...router.query,
          [name]: value,
        },
      },
      { shallow: true }
    );
  };
};
