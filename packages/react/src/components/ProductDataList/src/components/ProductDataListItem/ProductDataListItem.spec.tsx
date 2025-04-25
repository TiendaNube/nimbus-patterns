import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDataListItem } from './ProductDataListItem';

describe('ProductDataListItem', () => {
  const defaultProps = {
    id: 'test-id',
    title: 'Test Product',
  };

  it('renders title correctly', () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    const props = {
      ...defaultProps,
      imageUrl: 'test-image.jpg',
      imageAlt: 'Test image',
    };
    render(<ProductDataListItem {...props} />);
    const image = screen.getByAltText(props.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.imageUrl);
  });

  it('renders drag handle when isDraggable is true', () => {
    render(<ProductDataListItem {...defaultProps} isDraggable />);
    const dragButton = screen.getByRole('button');
    expect(dragButton).toBeInTheDocument();
    expect(dragButton).toHaveAttribute('aria-roledescription', 'sortable');
  });

  it('does not render drag handle when isDraggable is false', () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(screen.queryByRole('button', { name: /drag handle/i })).not.toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<ProductDataListItem {...defaultProps} onRemove={onRemove} />);
    
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders children content', () => {
    const childText = 'Child content';
    render(
      <ProductDataListItem {...defaultProps}>
        <div>{childText}</div>
      </ProductDataListItem>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
}); 