import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h1>Этой страницы не существует.Очень жаль</h1>
      <Link to="/" replace>Вернуться на главную</Link>
    </>
  );
};
