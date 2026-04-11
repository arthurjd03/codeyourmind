import { Hero } from "../../components/Hero";
import { Main } from "../../components/Main";
import { MainTemplate } from "../../templates/MainTemplate";

export function Home() {
  return (
    <MainTemplate>
      <>
        <Hero />

        <Main />
      </>
    </MainTemplate>
  );
}
