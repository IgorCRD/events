import React from 'react';
import PropTypes from 'prop-types';

import Lote from 'components/lote';

class Ingresso extends React.Component {
  static propTypes = {
    updateTotals: PropTypes.func.isRequired,
    ingresso: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      batches: PropTypes.arrayOf(Lote.propTypes.lote),
      __typename: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const {
      ingresso: { batches },
    } = props;
    this.state = {
      lotesState: batches.reduce((lotes, lote) => {
        /* eslint-disable-next-line no-param-reassign */
        lotes[lote.number] = {
          max: lote.purchaseable_quantities.reduce((maior, atual) => Math.max(maior, atual), -1),
          fees: lote.payment_methods,
        };
        return lotes;
      }, {}),
    };
  }

  onSelectHandler = (number, value) => {
    const { updateTotals, ingresso } = this.props;

    this.setState(
      state => ({
        lotesState: {
          ...state.lotesState,
          [number]: { ...state.lotesState[number], selected: value },
        },
      }),
      () => {
        updateTotals(ingresso.id, this.total('CREDIT'), this.total('BANK_SLIP'));
      },
    );
  };

  isActiveLote = (index) => {
    const { lotesState } = this.state;
    const {
      ingresso: { batches },
    } = this.props;

    const lotes = [...batches].sort((a, b) => a < b);

    return (
      index === 0
      || lotesState[lotes[index - 1].number].max
        === parseInt(lotesState[lotes[index - 1].number].selected, 10)
    );
  };

  total = (paymentType) => {
    const { lotesState } = this.state;
    const lotesSelecionados = Object.keys(lotesState)
      .map(loteNumber => lotesState[loteNumber])
      .filter(lote => parseInt(lote.selected, 10) > 0);

    return (
      lotesSelecionados.reduce(
        (total, lote) => total
          + lote.fees.filter(fee => fee.payment_type === paymentType)[0].due_amount
            * parseInt(lote.selected, 10),
        0,
      ) / 100
    );
  };

  render() {
    const { ingresso } = this.props;
    return (
      <React.Fragment>
        {[...ingresso.batches].sort((a, b) => a < b).map((lote, index) => (
          <Lote
            key={lote.id}
            lote={lote}
            name={ingresso.name}
            description={ingresso.description}
            onSelect={this.onSelectHandler}
            active={this.isActiveLote(index)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Ingresso;
