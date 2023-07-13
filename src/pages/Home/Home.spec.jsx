import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect';


describe('Home', () => {
  test('exibe a mensagem "Loading..." durante o carregamento', async () => {
    render(<Home />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeTruthy();
  });

  test('exibe o botão "Clique para embaralhar as cartas"', async () => {
    render(<Home />);
    const buttonElement = await screen.findByRole('button', {
      name: /Clique para embaralhar as cartas/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

});
