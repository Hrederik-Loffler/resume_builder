// @NOTE: Import from libraries.

// @NOTE: Import from own files.

export interface ITextProps {
    text: string;
}

export default function Text({ text }: ITextProps) {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}
