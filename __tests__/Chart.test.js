/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import Chart from '../src/components/Chart';

describe('Snapshot test', () => {
  it('should match snapshot', () => {
    const noPropsComponent = renderer.create(<Chart />);
    let tree = noPropsComponent.toJSON();
    expect(tree).toMatchSnapshot();
    const component = renderer.create(<Chart chartType="ScatterChart" data={[['Age', 'Weight'], [8, 12], [4, 5.5]]} options={{}} graph_id="ScatterChart" width={'100%'} height={'400px'} legend_toggle />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
