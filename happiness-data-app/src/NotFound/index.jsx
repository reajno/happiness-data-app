import MainSection from "../Components/MainSection";

export default function NotFound({
  message,
  pageTitle = "404 PAGE NOT FOUND",
  children,
}) {
  return (
    <MainSection pageTitle={pageTitle} pageText={message}>
      {children}
    </MainSection>
  );
}
