import React from 'react';
import './Results.css';

const Results = () => {

  return (
    <div className="results">
      <div className = "results-wrapper">
        <h1>Results</h1>
        <div className="ResultsImage">
          <img src="/singleListening.png" alt="personality" />
        </div>
        <ul>
          <li><b>Result 1</b></li>
          <li><b>Result 2</b></li>
          <li><b>Result 3</b></li>
        </ul>
        <div className="ResultsWrapper">
          <p><b>NAME</b>, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus velit vel turpis iaculis tempus. Aliquam erat volutpat. Maecenas dapibus nisl non risus maximus eleifend. In eu porttitor arcu. Curabitur et ligula vel est ullamcorper mollis sit amet nec velit. Nulla a malesuada massa. Cras molestie metus at nunc dignissim, ut facilisis eros faucibus. In feugiat tortor vulputate erat pulvinar tempus. Pellentesque luctus porta tristique. Integer mollis blandit ultrices. </p>
          <p>Proin vestibulum eu enim at venenatis. Vestibulum ut leo feugiat, tincidunt metus in, congue lorem. Nam ultrices volutpat ipsum quis placerat. In quis dolor vel odio iaculis convallis. Sed feugiat eros a vehicula sollicitudin. Aliquam quis pretium ante. Vivamus vulputate massa in pellentesque mollis. Etiam cursus ornare neque eu eleifend. Aliquam eu tempor sem. Proin ac lacus non tellus sodales ultrices sed vestibulum ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
          <p>Integer turpis odio, dictum ut maximus in, iaculis quis mi. Aliquam porta dignissim elit, sit amet viverra erat viverra quis. Pellentesque fringilla, leo nec molestie gravida, libero est placerat elit, nec dapibus ex eros a justo. Duis fringilla maximus sapien, in venenatis neque. Cras ultrices sit amet dolor sed dictum. Nulla placerat nibh felis, eu ultricies nunc aliquet sit amet. Proin lacus justo, auctor ut tempus vitae, finibus ac tortor. Nulla nec massa vel purus semper congue eu id turpis. Quisque dapibus quam at egestas dapibus. Sed et sodales massa. Vestibulum sodales nibh nec dolor luctus, quis volutpat velit congue. Donec quis turpis a metus vehicula tincidunt. Ut massa turpis, feugiat sit amet scelerisque eget, commodo vitae urna. Vivamus a ex sit amet velit blandit volutpat in in ligula. </p>
          <p>Suspendisse sagittis convallis mattis. Nulla et scelerisque odio. Pellentesque tempus tristique dui, sed interdum ligula gravida sit amet. Vivamus id nunc ut libero interdum vehicula. Nam id gravida nisl. Praesent sit amet diam ut ipsum bibendum consequat. Nulla fermentum dapibus lacus nec placerat. Vestibulum dapibus viverra diam, vitae sollicitudin sapien gravida eget. Morbi non odio sit amet tortor lacinia elementum ut quis quam. </p>
        </div>
      </div>
      
    </div>
  );
};

export default Results;
