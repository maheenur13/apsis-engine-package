
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

interface FormTextEditorProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    getEvent?: (event: { target: { name: string; value: string } }) => void;
    placeholder?:string;
    disabled?:boolean;
}

export const FormTextEditor: React.FC<FormTextEditorProps> = ({
    name,
    value,
    onChange,
    getEvent,
    ...rest
}) => {
    const editorRef = useRef<any>();
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
    const { CKEditor, Editor } = editorRef.current || {};
    const editorConfiguration = {
        fontSize: {
            options: [8, 10, 12, 14, "default", 18, 20, 24, 32, 36, 40],
            supportAllValues: true,
        },
        removePlugins: ["MediaEmbed", "Style"],
    };

    useEffect(() => {
        editorRef.current = {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            Editor: require("ckeditor5-custom-build/build/ckeditor"),
        };
        setEditorLoaded(true);
    }, []);

    // initial content
    const [content, setContent] = useState<string>("");

    // when update content
    const updateContent = (value: string) => {
        if (onChange) {
            onChange(value);
        }

        const target = { name, value };
        if (getEvent) {
            getEvent({ target });
        }
    };

    // handle input effect
    useEffect(() => {
        setContent(value ?? "");
    }, [name, value]);

    return editorLoaded ? (
        <TextEditorStyle>
            <CKEditor
                editor={Editor}
                data={content}
                onChange={(event: any, editor: any) => {
                    updateContent(editor.getData());
                }}
                config={editorConfiguration}
                {...rest}
            />
        </TextEditorStyle>
    ) : (
        <Center>
            <Spin spinning={true} />
        </Center>
    );
};

const TextEditorStyle = styled.div`
    .ck-read-only {
        background: #f5f5f5 !important;
        user-select: none !important;
    }
`;

const Center = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
`;
