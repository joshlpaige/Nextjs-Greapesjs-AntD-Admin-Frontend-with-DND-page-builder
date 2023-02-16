import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface FlexProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    justify?: 'space-around' | 'space-between' | 'space-evenly' | 'stretch' | 'center' | 'end' | 'flex-end' | 'flex-start';
    align?:
        | 'center'
        | 'end'
        | 'flex-end'
        | 'flex-start'
        | 'self-end'
        | 'self-start'
        | 'start'
        | 'baseline'
        | 'normal'
        | 'stretch';
    wrap?: string;
    fullwidth?: boolean;
    direction?: 'row' | 'column';
}

const FlexContainer: React.FC<FlexProps> = ({ justify, align, wrap, fullwidth, direction, ...props }) => {
    return (
        <div
            {...props}
            style={{
                ...props.style,
                display: 'flex',
                justifyContent: justify,
                alignItems: align,
                flexDirection: direction,
                flexWrap: wrap ? 'wrap' : 'inherit',
                width: fullwidth ? '100%' : 'auto',
            }}
        >
            {props.children}
        </div>
    );
};

export default FlexContainer;
