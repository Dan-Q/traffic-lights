export function Bulb({ color, on }) {
  if(!color) throw new Error('Color is required');

  const css = {
    backgroundColor: on ? color : 'black',
  }

  return <div className="bulb" style={ css } />;
}
