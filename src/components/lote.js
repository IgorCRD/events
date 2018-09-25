import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';

import numberFormatter from 'src/utils';

const Lote = ({
  lote, name, description, onSelect, active,
}) => (
  <Flex
    flexDirection="column"
    pb="1em"
    style={active ? {} : { pointerEvents: 'none', opacity: '0.4' }}
  >
    <span>{`${name} - Lote ${lote.number}`}</span>
    {description && <span>{description}</span>}
    <span>
      {lote.price > 0 ? `${numberFormatter.format((lote.price / 100).toPrecision(3))}` : 'Grátis'}
    </span>
    <select
      onChange={(event) => {
        onSelect(lote.number, event.target.value);
      }}
    >
      <optgroup label="Qtd.">
        <option key={0} value={0}>
          {0}
        </option>
        {lote.purchaseable_quantities.map(quant => (
          <option key={quant} value={quant}>
            {quant}
          </option>
        ))}
      </optgroup>
    </select>
  </Flex>
);

Lote.propTypes = {
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  lote: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.number,
    price: PropTypes.number,
    purchaseable_quantities: PropTypes.arrayOf(PropTypes.number),
    payment_methods: PropTypes.arrayOf(
      PropTypes.shape({
        due_amount: PropTypes.number,
        due_service_fee: PropTypes.number,
        payment_type: PropTypes.string,
        __typename: PropTypes.string,
      }),
    ),
    __typename: PropTypes.string,
  }).isRequired,
};

Lote.defaultProps = {
  description: '',
  active: false,
};

export default Lote;
