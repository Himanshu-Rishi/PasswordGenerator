import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";
import { Formik } from "formik";
const App = () => {
  const passwordSchema = yup.object().shape({
    passwordLength: yup
      .number()
      .required("Length is required")
      .min(4, "At least 4 letters are required.")
      .max(16, "Cannot exceed more than 16 letter"),
  });

  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (length: number) => {
    let result = "";
    result += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) {
      result += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (numbers) {
      result += "1234567890";
    }
    if (symbols) {
      result += "@.$&*";
    }
    const generatedPassword = generatePassword(result, length);
    console.log(generatedPassword);
    setPassword(generatedPassword);
    setIsPassGenerated(true);
  };

  const generatePassword = (character: string, length: number): string => {
    let result = "";
    for (let index = 0; index < length; index++) {
      const element = Math.round(Math.random() * character.length);
      result += character.charAt(element);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");
    setIsPassGenerated(false);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.heading__text}>Password Generator</Text>
        </View>
        <View>
          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              isValid,
              touched,
              handleReset,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <View>
                  <View>
                    <View>
                      <Text>Password Length:</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text>{errors.passwordLength}</Text>
                      )}
                    </View>
                    <View>
                      <TextInput
                        value={values.passwordLength}
                        onChangeText={handleChange("passwordLength")}
                        placeholder="Ex. 8"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  <View>
                    <Text>Include Uppercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="#016A70"
                    />
                  </View>
                  <View>
                    <Text>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#176B87"
                    />
                  </View>
                  <View>
                    <Text>Include symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#053B50"
                    />
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                  >
                    <Text>Get Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text>Reset Password</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {isPassGenerated ? (
                    <Text selectable={true}>{password}</Text>
                  ) : null}
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading__text: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    fontWeight: "800",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
  },
});

export default App;
