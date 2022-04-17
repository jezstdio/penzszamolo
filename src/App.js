import { useEffect, useState } from 'react';
import './8px-grid.min.css';
import './style.scss';

function App() {
  const [values, setValues] = useState({
    "20000": { piece: 0 },
    "10000": { piece: 0 },
    "5000": { piece: 0 },
    "2000": { piece: 0 },
    "1000": { piece: 0 },
    "500": { piece: 0 },
    "200": { piece: 0 },
    "100": { piece: 0 },
    "50": { piece: 0 },
    "20": { piece: 0 },
    "10": { piece: 0 },
    "5": { piece: 0 }
  });

  function formNumber(number) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : '-';
  }

  return (
    <div className="App padding-y-80 margin-x-auto width-327">
      { Object.keys(values).map((value, index) =>
        <div key={index} className="padding-b-8">
          <One index={index} formNumber={formNumber} values={values} value={value} piece={values[value].piece} setValues={setValues} />
        </div>).reverse()}
        <div className="text-right font-weight-bold font-size-24 margin-t-16">
          { formNumber(Object.keys(values).filter(a => values[a].piece).reduce((a, b) => {
            return parseInt(a) + (parseInt(b) * parseInt(values[b].piece))
          }, 0))}
        </div>
    </div>
  );
}

function One(props) {
  const [multiply, setMultiply] = useState(0);

  function updateValue(e) {
    props.setValues({
      ...props.values,
      [props.value]: { piece: e.target.value }
    });
  }

  useEffect(() => { setMultiply(parseInt(props.value) * (parseInt(props.piece) || 0)) });

  return (
    <div className="flex row color3-bg width-327 radius-16">
      <div>
        <div className="color2-bg radius-16 flex row width-150">
          <div className="width-82 text-right color1-bg radius-16">
            <span className="block padding-16 padding-y-4 font-weight-bold">{props.formNumber(props.value)}</span>
          </div>
          <input className="text-right padding-x-16 padding-y-4 width-100" type="number" value={props.piece} pattern="[0-9]*" inputMode="numeric"
            onChange={updateValue}
            onClick={e => e.target.select()}
          />
        </div>
      </div>
      <span className="block width-100 text-right padding-x-16 padding-y-4">{props.formNumber(multiply)}</span>
    </div>
  )
}

export default App;
