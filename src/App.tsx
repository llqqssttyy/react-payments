import './index.css';

import { Outlet } from 'react-router-dom';

function App() {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumbers: ['', '', '', ''],
    expirationDate: ['', ''],
    ownerName: '',
  });

  const setCardData = (
    key: keyof CardInfo,
    newData: CardInfo[keyof CardInfo]
  ) => {
    setCardInfo({ ...cardInfo, [key]: newData });
  };

  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
