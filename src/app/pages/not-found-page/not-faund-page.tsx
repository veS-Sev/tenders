import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>Этой страницы не существует.Очень жаль</h1>
      <Link to="/" replace>Вернуться на главную</Link>
    </>
  );
};
export default NotFoundPage 