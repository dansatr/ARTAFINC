import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { loginCopy } from '../copy';
import { palette, radius } from '../theme';
import { requestSignIn } from '../services/authService';

function collectFieldErrors(username, password) {
  const fieldErrors = {};
  if (!username.trim()) fieldErrors.username = loginCopy.usernameRequired;
  if (!password) fieldErrors.password = loginCopy.passwordRequired;
  return fieldErrors;
}

function LabeledField({ label, error, isFocused, trailing, inputRef, ...inputProps }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={[
          styles.fieldBox,
          isFocused && styles.fieldBoxFocused,
          error && styles.fieldBoxError,
        ]}
      >
        <TextInput
          ref={inputRef}
          style={styles.fieldInput}
          placeholderTextColor={palette.inkSoft}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        {trailing}
      </View>
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

export default function LoginScreen({ onSignedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordInputRef = useRef(null);

  function updateUsername(value) {
    setUsername(value);
    if (fieldErrors.username) setFieldErrors((prev) => ({ ...prev, username: undefined }));
    if (formError) setFormError('');
  }

  function updatePassword(value) {
    setPassword(value);
    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
    if (formError) setFormError('');
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  async function submitLoginForm() {
    if (isSubmitting) return;

    const nextErrors = collectFieldErrors(username, password);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      const result = await requestSignIn(username.trim(), password);
      if (result.isSuccessful) {
        onSignedIn?.(result.user);
      } else {
        setFormError(loginCopy.loginFailed);
      }
    } catch {
      setFormError(loginCopy.loginFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.column}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkLetter}>A</Text>
            </View>
            <View>
              <Text style={styles.brandName}>{loginCopy.brandName}</Text>
              <Text style={styles.brandTagline}>{loginCopy.brandTagline}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>{loginCopy.heading}</Text>
            <Text style={styles.subheading}>{loginCopy.subheading}</Text>

            <LabeledField
              label={loginCopy.usernameLabel}
              placeholder={loginCopy.usernamePlaceholder}
              value={username}
              onChangeText={updateUsername}
              error={fieldErrors.username}
              isFocused={focusedField === 'username'}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              textContentType="username"
              autoComplete="username"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              editable={!isSubmitting}
            />

            <LabeledField
              inputRef={passwordInputRef}
              label={loginCopy.passwordLabel}
              placeholder={loginCopy.passwordPlaceholder}
              value={password}
              onChangeText={updatePassword}
              error={fieldErrors.password}
              isFocused={focusedField === 'password'}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              autoComplete="current-password"
              returnKeyType="go"
              onSubmitEditing={submitLoginForm}
              editable={!isSubmitting}
              trailing={
                <Pressable
                  onPress={togglePasswordVisibility}
                  hitSlop={8}
                  accessibilityRole="button"
                  style={styles.visibilityToggle}
                >
                  <Text style={styles.visibilityToggleText}>
                    {isPasswordVisible ? loginCopy.hidePassword : loginCopy.showPassword}
                  </Text>
                </Pressable>
              }
            />

            {formError ? (
              <View style={styles.formErrorBox}>
                <Text style={styles.formErrorText}>{formError}</Text>
              </View>
            ) : null}

            <Pressable
              onPress={submitLoginForm}
              disabled={isSubmitting}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                isSubmitting && styles.submitButtonBusy,
              ]}
            >
              {isSubmitting ? (
                <View style={styles.submitBusyRow}>
                  <ActivityIndicator color={palette.white} size="small" />
                  <Text style={styles.submitText}>{loginCopy.submitting}</Text>
                </View>
              ) : (
                <Text style={styles.submitText}>{loginCopy.submit}</Text>
              )}
            </Pressable>
          </View>

          <Text style={styles.footer}>{loginCopy.footer}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const serifFamily = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia, "Times New Roman", serif',
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.paper,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  column: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 12,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: palette.forest,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: palette.clay,
  },
  brandMarkLetter: {
    color: palette.paper,
    fontSize: 22,
    fontFamily: serifFamily,
    fontWeight: '700',
  },
  brandName: {
    fontSize: 22,
    color: palette.ink,
    fontFamily: serifFamily,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: 13,
    color: palette.inkSoft,
    marginTop: 1,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 24,
  },
  heading: {
    fontSize: 24,
    color: palette.ink,
    fontFamily: serifFamily,
    fontWeight: '600',
  },
  subheading: {
    fontSize: 14,
    color: palette.inkSoft,
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.ink,
    marginBottom: 6,
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: radius.field,
    backgroundColor: palette.white,
    paddingHorizontal: 14,
  },
  fieldBoxFocused: {
    borderColor: palette.lineFocus,
  },
  fieldBoxError: {
    borderColor: palette.danger,
  },
  fieldInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: palette.ink,
    ...Platform.select({ web: { outlineStyle: 'none' }, default: {} }),
  },
  fieldError: {
    fontSize: 12,
    color: palette.danger,
    marginTop: 6,
  },
  visibilityToggle: {
    paddingLeft: 10,
    paddingVertical: 6,
  },
  visibilityToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.forest,
  },
  formErrorBox: {
    backgroundColor: '#F7E6E1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  formErrorText: {
    fontSize: 13,
    color: palette.danger,
  },
  submitButton: {
    height: 50,
    borderRadius: radius.field,
    backgroundColor: palette.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitButtonPressed: {
    backgroundColor: palette.forestPressed,
  },
  submitButtonBusy: {
    opacity: 0.85,
  },
  submitBusyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: palette.inkSoft,
    marginTop: 20,
  },
});
