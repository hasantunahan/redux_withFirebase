import React from 'react'
import { Snackbar } from 'react-native-paper';

const CustomSnackBar = ({ isDismiss, text,backgroundColor }) => {
    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    React.useEffect(() => {
        setVisible(isDismiss)
    }, [isDismiss])

    return (
        <Snackbar
            style={{
                backgroundColor: backgroundColor ?? 'black',
                zIndex:999
            }}
            duration={2500}
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
                onPress: () => {
                    // Do something
                },
            }}>
            {text ?? "Message"}
        </Snackbar>
    );
}
export default CustomSnackBar