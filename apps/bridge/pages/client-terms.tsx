import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ReactMarkdown from "react-markdown";

import { bridgeControllerGetBridgeConfigByDomainV2 } from "@/codegen/index";
import { TermsLayout } from "@/components/layouts/terms-layout";

export default function ClientTerms({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <TermsLayout>
      <section className="max-w-3xl mx-auto p-8 prose prose-sm prose-headings:font-heading dark:prose-invert">
        <h1>{data?.name} Terms of Service</h1>
        <ReactMarkdown>{data?.tos?.customTermsOfService}</ReactMarkdown>
      </section>
    </TermsLayout>
  );
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  if (!req.headers.host) {
    return { props: { data: null, host: "" } };
  }

  const { data } = await bridgeControllerGetBridgeConfigByDomainV2(
    req.headers.host
  );

  return { props: { data, host: req.headers.host } };
};
