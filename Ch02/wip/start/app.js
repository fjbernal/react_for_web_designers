(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      return props.sizes.map((num) => {
        return (
          <option value={num} key={num}>{num}</option>
        )
      });
    }

    const onSizeChange = (evt) => {
      console.log(evt.target.value);
      props.handleSizeChange(evt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size} name="sizeOptions" id="size-options" onChange={onSizeChange} value={props.size}>
          {sizeOptions()}
        </select>
      </div>
    );
  }

  function ColorSelector(props) {
    function colorOptions() {
      return props.colors.map((name) => {
        return (
          <option value={name} key={name}>{name}</option>
        )
      });
    }

    const onColorChange = (event) => {
      props.handleColorChange(event.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color} name="colorOptions" id="color-options" onChange={onColorChange} value={props.color}>
          {colorOptions()}
        </select>
      </div>
    );
  }

  function ProductImage(props) {
    return (
      <img src={`../../../assets/${props.color}.jpg`} alt="Product image" />
    );
  }

  function ProductCustomizer(props) {
    const [size, setSize] = React.useState(8);
    const [sizes, setSizes] = React.useState(window.Inventory.allSizes);

    const [color, setColor] = React.useState("red");
    const [colors, setColors] = React.useState(window.Inventory.allColors);

    const handleSizeChange = (selectedSize) => {
        const availableColors = window.Inventory.bySize[selectedSize];
        
        setColors(availableColors);
        setSize(selectedSize);

        if (availableColors.indexOf(color) === -1) {
          setColor(availableColors[0]);
        }
    }

    const handleColorChange = (selectedColor) => {
      const availableSizes = window.Inventory.byColor[selectedColor];
      
      setSizes(availableSizes);
      setColor(selectedColor);

      if (availableSizes.indexOf(size) === -1) {
        setSize(availableSizes[0]);
      }
    }

    return (
      <div className="customizer">
        <div className="product-image">
          <ProductImage color={color} />
        </div>
        <div className="selectors">
							<SizeSelector size={size} sizes={sizes} handleSizeChange={handleSizeChange} />
              <ColorSelector color={color} colors={colors} handleColorChange={handleColorChange} />
						</div>
      </div>
    );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));

})();
