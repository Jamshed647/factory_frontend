/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

/*                               Base TypeDefs                                */

type BaseValidationProps = {
  min?: number;
  max?: number;
  label?: string;
  required?: boolean;
  customMessage?: string;
};

type PasswordValidationProps = BaseValidationProps & {
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  preventSequentialNumbers?: boolean;
  preventCommonPatterns?: boolean;
  minNumbers?: number;
  minSpecialChars?: number;
};

type EmailValidationProps = BaseValidationProps & {
  allowPlus?: boolean;
  allowMultipleDots?: boolean;
  specificDomains?: string[];
  blockDomains?: string[];
};

type PhoneValidationProps = BaseValidationProps & {
  countryCode?: "optional" | "required" | "none";
  format?: "international" | "national" | "any";
  allowedCountries?: string[];
};

type UrlValidationProps = BaseValidationProps & {
  requireHttps?: boolean;
  allowedDomains?: string[];
  blockedDomains?: string[];
};

interface NumberValidationProps {
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
  integerOnly?: boolean;
  positiveOnly?: boolean;
  type?: "number" | "string";
}

type TextValidationProps = BaseValidationProps & {
  allowNumbers?: boolean;
  allowSpecialChars?: boolean;
  allowNewlines?: boolean;
  trimWhitespace?: boolean;
};

type NameValidationProps = BaseValidationProps & {
  allowMultipleWords?: boolean;
  allowAccents?: boolean;
};

type UsernameValidationProps = BaseValidationProps & {
  allowUnderscore?: boolean;
  allowDash?: boolean;
  allowDot?: boolean;
  mustStartWithLetter?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                         Core Schema Factory Helper                         */
/* -------------------------------------------------------------------------- */
const createStringSchema = (props: BaseValidationProps = {}) => {
  const {
    min = 1,
    max = 255,
    label = "Field",
    required = true,
    customMessage,
  } = props;
  let schema = z.string();

  if (required) {
    schema = schema.min(min, {
      message:
        customMessage ||
        `${label} must be at least ${min} character${min > 1 ? "s" : ""}`,
    });
  }

  return schema.max(max, {
    message: customMessage || `${label} must be at most ${max} characters`,
  });
};

// const createStringSchema = (props: BaseValidationProps = {}) => {
//   const {
//     min = 1,
//     max = 255,
//     label = "Field",
//     required = true,
//     customMessage,
//   } = props;
//   let schema = z.string();
//
//   if (required) {
//     schema = schema.min(min, {
//       message:
//         customMessage ||
//         `${label} must be at least ${min} character${min > 1 ? "s" : ""}`,
//     });
//   }
//
//   return schema.max(max, {
//     message: customMessage || `${label} must be at most ${max} characters`,
//   });
// };

/* -------------------------------------------------------------------------- */
/*                                Email Schema                                */
/* -------------------------------------------------------------------------- */

export const emailSchema = (props: EmailValidationProps = {}) => {
  const { label = "Email", required = true } = props;

  // Base email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val && !required) return true; // optional and empty -> valid
        return emailRegex.test(val); // otherwise must match email pattern
      },
      { message: `${label} must be a valid email address` },
    )
    .refine(
      (val) => {
        if (!val && !required) return true; // optional and empty -> valid
        return val.length > 0; // required check
      },
      { message: `${label} is required` },
    );
};

/* -------------------------------------------------------------------------- */
/*                               Password Schema                              */
/* -------------------------------------------------------------------------- */

const passwordSchema = (props: PasswordValidationProps = {}) => {
  const {
    label = "Password",
    min = 8,
    max = 128,
    required = true,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    preventSequentialNumbers = true,
    preventCommonPatterns = true,
    // minNumbers = 1,
    // minSpecialChars = 1,
  } = props;

  let schema = createStringSchema({ min, max, label, required });

  const rules: { regex: RegExp; message: string }[] = [];

  if (requireUppercase)
    rules.push({ regex: /[A-Z]/, message: "at least one uppercase letter" });
  if (requireLowercase)
    rules.push({ regex: /[a-z]/, message: "at least one lowercase letter" });
  if (requireNumbers)
    rules.push({ regex: /\d/, message: "at least one number" });
  if (requireSpecialChars)
    rules.push({
      regex: /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/,
      message: "at least one special character",
    });

  rules.forEach(({ regex, message }) => {
    schema = schema.refine((val) => regex.test(val), {
      message: `${label} must include ${message}`,
    });
  });

  if (preventSequentialNumbers) {
    schema = schema.refine(
      (val) =>
        !/(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(
          val,
        ),
      { message: `${label} cannot contain sequential numbers` },
    );
  }

  if (preventCommonPatterns) {
    const badPatterns = [
      /password/i,
      /123456/,
      /qwerty/i,
      /asdfgh/i,
      /zxcvbn/i,
      /abcdef/i,
    ];
    schema = schema.refine((val) => !badPatterns.some((p) => p.test(val)), {
      message: `${label} is too common or predictable`,
    });
  }

  schema = schema.refine((val) => !/(.)\1{2,}/.test(val), {
    message: `${label} cannot contain the same character repeated 3 or more times`,
  });

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                Username Schema                             */
/* -------------------------------------------------------------------------- */

const usernameSchema = (props: UsernameValidationProps = {}) => {
  const {
    label = "Username",
    min = 3,
    max = 30,
    required = true,
    allowUnderscore = true,
    allowDash = true,
    allowDot = true,
    mustStartWithLetter = true,
  } = props;

  let schema = createStringSchema({ min, max, label, required });

  let allowed = "a-zA-Z0-9";
  if (allowUnderscore) allowed += "_";
  if (allowDash) allowed += "-";
  if (allowDot) allowed += ".";

  const pattern = new RegExp(`^[${allowed}]+$`);

  schema = schema
    .refine((val) => pattern.test(val), {
      message: `${label} contains invalid characters`,
    })
    .refine((val) => !/[._-]{2,}/.test(val), {
      message: `${label} cannot contain consecutive special characters`,
    })
    .refine((val) => !/[._-]$/.test(val), {
      message: `${label} cannot end with a special character`,
    });

  if (mustStartWithLetter) {
    schema = schema.refine((val) => /^[a-zA-Z]/.test(val), {
      message: `${label} must start with a letter`,
    });
  }

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                  URL Schema                                */
/* -------------------------------------------------------------------------- */

export const urlSchema = (props: UrlValidationProps = {}) => {
  const {
    label = "URL",
    required = true,
    requireHttps = false,
    allowedDomains,
    blockedDomains,
  } = props;

  const base = z
    .string()
    .min(5, `${label} must be at least 5 characters`)
    .max(2048, `${label} must be less than 2048 characters`)
    .refine((val) => {
      try {
        const url = new URL(val);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    }, `${label} must be a valid URL`)
    .refine(
      (val) => !requireHttps || val.startsWith("https://"),
      `${label} must use HTTPS`,
    )
    .refine(
      (val) =>
        !allowedDomains?.length ||
        allowedDomains.some((d) => new URL(val).hostname.endsWith(d)),
      `${label} must be from: ${allowedDomains?.join(", ")}`,
    )
    .refine(
      (val) =>
        !blockedDomains?.length ||
        !blockedDomains.some((d) => new URL(val).hostname.endsWith(d)),
      `${label} from this domain is not allowed`,
    );

  // ✅ Optional handling:
  // Use `superRefine` to skip all checks for empty/undefined
  return z
    .union([base, z.literal(""), z.undefined()])
    .superRefine((val, ctx) => {
      if (required && (!val || val === "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required`,
        });
      }
    });
};

/* -------------------------------------------------------------------------- */
/*                                 Phone Schema                               */
/* -------------------------------------------------------------------------- */

const phoneSchema = (props: PhoneValidationProps = {}) => {
  const {
    label = "Phone number",
    required = true,
    countryCode = "optional",
    allowedCountries,
  } = props;

  let schema: z.ZodTypeAny = createStringSchema({
    min: 8,
    max: 15,
    label,
    required,
  });

  // Clean the phone number - allow more characters
  schema = (schema as z.ZodString).transform((val) =>
    val.replace(/[\s\-()]/g, ""),
  );

  // Allow digits from any script (Unicode category Nd = Decimal Digit Number)
  // This includes: 0-9, ০-৯ (Bengali), ٠-٩ (Arabic), etc.
  schema = (schema as z.ZodString).refine(
    (val) => /^[+]?[\p{Nd}]+$/u.test(val),
    {
      message: `${label} must contain only digits and optional +`,
    },
  );

  // Rest of the function remains the same...
  // Country code validation
  if (countryCode === "required") {
    schema = (schema as z.ZodString).refine((val) => val.startsWith("+"), {
      message: `${label} must start with country code (e.g., +1)`,
    });
  }

  if (allowedCountries?.length) {
    schema = (schema as z.ZodString).refine(
      (val) => {
        if (!val.startsWith("+")) return false; // Must have country code

        // Check if any allowed country code matches
        return allowedCountries.some((countryCode) =>
          val.startsWith(countryCode),
        );
      },
      {
        message: `${label} must be from allowed countries: ${allowedCountries.join(", ")}`,
      },
    );
  }

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                 Number Schema                              */
/* -------------------------------------------------------------------------- */

export const numberSchema = (
  props: NumberValidationProps = {},
): z.ZodTypeAny => {
  const {
    label = "Number",
    required = true,
    min,
    max,
    integerOnly = false,
    positiveOnly = false,
    type = "number",
  } = props;

  // Handle string type numbers (accepts international numerals)
  if (type === "string") {
    return createStringNumberSchema({
      label,
      required,
      min,
      max,
      integerOnly,
      positiveOnly,
    });
  }

  // Handle native number type
  return createNativeNumberSchema({
    label,
    required,
    min,
    max,
    integerOnly,
    positiveOnly,
  });
};

// Helper function for string-based number validation
const createStringNumberSchema = (props: {
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  integerOnly: boolean;
  positiveOnly: boolean;
}): z.ZodTypeAny => {
  const { label, required, min, max, integerOnly, positiveOnly } = props;

  let schema: any = z.string();

  if (!required) {
    schema = schema.optional();
  }

  // Convert international numerals to Western Arabic for validation
  const normalizeNumber = (val: string): string => {
    return val.replace(/[\p{Nd}]/gu, (char) => {
      const digit = char.codePointAt(0)!;
      // Map various numeral systems to Western Arabic
      const mappings = [
        [0x660, 0x669], // Arabic
        [0x6f0, 0x6f9], // Eastern Arabic
        [0x966, 0x96f], // Devanagari
        [0x9e6, 0x9ef], // Bengali
        [0xa66, 0xa6f], // Gurmukhi
        [0xae6, 0xaef], // Gujarati
        [0xb66, 0xb6f], // Oriya
        [0xbe6, 0xbef], // Tamil
        [0xc66, 0xcef], // Telugu
        [0xce6, 0xcef], // Kannada
        [0xd66, 0xdef], // Malayalam
        [0xe50, 0xe59], // Thai
        [0xed0, 0xed9], // Lao
        [0xf20, 0xf29], // Tibetan
      ];

      for (const [start, end] of mappings) {
        if (digit >= start && digit <= end) {
          return String(digit - start);
        }
      }
      return char; // Already Western Arabic
    });
  };

  // Basic number validation
  schema = schema.refine((val: string) => {
    if (!required && !val) return true;
    const trimmed = (val || "").trim();
    if (trimmed === "") return !required;

    const normalized = normalizeNumber(trimmed);
    const num = Number(normalized);
    return !isNaN(num) && isFinite(num);
  }, `${label} must be a valid number`);

  // Helper for adding refinements
  const addRefinement = (
    condition: (val: string) => boolean,
    message: string,
  ) => {
    schema = schema.refine((val: string) => {
      if (!required && !val) return true;
      const trimmed = (val || "").trim();
      if (trimmed === "") return !required;

      const normalized = normalizeNumber(trimmed);
      return condition(normalized);
    }, message);
  };

  if (integerOnly) {
    addRefinement((val) => /^-?\d+$/.test(val), `${label} must be an integer`);
  }

  if (positiveOnly) {
    addRefinement((val) => Number(val) >= 0, `${label} must be positive`);
  }

  if (min !== undefined) {
    addRefinement(
      (val) => Number(val) >= min,
      `${label} must be at least ${min}`,
    );
  }

  if (max !== undefined) {
    addRefinement(
      (val) => Number(val) <= max,
      `${label} must be at most ${max}`,
    );
  }

  return schema;
};

// Helper function for native number type validation
const createNativeNumberSchema = (props: {
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  integerOnly: boolean;
  positiveOnly: boolean;
}): z.ZodTypeAny => {
  const { label, required, min, max, integerOnly, positiveOnly } = props;

  let schema: any = z.number();

  if (!required) {
    schema = schema.optional();
  }

  // Helper for adding refinements
  const addRefinement = (
    condition: (val: number) => boolean,
    message: string,
  ) => {
    schema = schema.refine((val: number) => {
      if (!required && val === undefined) return true;
      return condition(val);
    }, message);
  };

  if (integerOnly) {
    addRefinement(
      (val) => Number.isInteger(val),
      `${label} must be an integer`,
    );
  }

  if (positiveOnly) {
    addRefinement((val) => val >= 0, `${label} must be positive`);
  }

  if (min !== undefined) {
    addRefinement((val) => val >= min, `${label} must be at least ${min}`);
  }

  if (max !== undefined) {
    addRefinement((val) => val <= max, `${label} must be at most ${max}`);
  }

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                 Name Schema                                */
/* -------------------------------------------------------------------------- */

export const nameSchema = (props: NameValidationProps = {}) => {
  const {
    label = "Name",
    min = 2,
    max = 50,
    required = true,
    allowMultipleWords = true,
  } = props;

  let schema: z.ZodTypeAny = createStringSchema({ min, max, label, required });

  // Trim whitespace
  schema = (schema as z.ZodString).transform((v) => v.trim());

  // Check for consecutive spaces
  schema = (schema as z.ZodString).refine((val) => !/\s{2,}/.test(val), {
    message: `${label} cannot contain consecutive spaces`,
  });

  // Character-by-character validation - allow all Unicode letters and common punctuation
  schema = (schema as z.ZodString).refine(
    (val) => {
      // Check each character
      for (let i = 0; i < val.length; i++) {
        const char = val[i];

        // Allow letters from any language (including Bengali, Arabic, Chinese, etc.)
        if (/[\p{L}\p{M}]/u.test(char)) continue;

        // Allow spaces, dots, hyphens, apostrophes, commas, and other common punctuation
        if (" .-',…—–。・・・・・".includes(char)) continue;

        // Allow numbers in names (some cultures include numbers in names)
        if (/\p{N}/u.test(char)) continue;

        // Allow parentheses and brackets for some naming conventions
        if ("()[]{}".includes(char)) continue;

        // Character not allowed - only block truly problematic characters
        if (/[\p{C}\p{Zl}\p{Zp}]/u.test(char)) return false; // Control characters and line/paragraph separators
      }

      return true;
    },
    {
      message: `${label} contains invalid characters`,
    },
  );

  // Word count validation
  schema = (schema as z.ZodString).refine(
    (val) => {
      const words = val.trim().split(/\s+/);
      return allowMultipleWords ? words.length >= 1 : words.length === 1;
    },
    {
      message: allowMultipleWords
        ? `${label} must contain at least one word`
        : `${label} must be a single word`,
    },
  );

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                  Text Schema                               */
/* -------------------------------------------------------------------------- */

const textSchema = (props: TextValidationProps = {}) => {
  const {
    min = 1,
    max = 200,
    label = "Text",
    required = true,
    allowNumbers = true,
    allowSpecialChars = true,
    allowNewlines = false,
    trimWhitespace = true,
  } = props;

  let schema: z.ZodTypeAny = createStringSchema({ min, max, label, required });

  if (trimWhitespace) {
    schema = (schema as z.ZodString).transform((v) => v.trim());
  }

  // Check for consecutive spaces
  schema = (schema as z.ZodString).refine((val) => !/\s{2,}/.test(val), {
    message: `${label} cannot contain consecutive spaces`,
  });

  // Character-by-character validation (most reliable)
  schema = (schema as z.ZodString).refine(
    (val) => {
      // Check each character
      for (let i = 0; i < val.length; i++) {
        const char = val[i];

        // Always allow any Unicode letter (any language)
        if (/[\p{L}\p{M}]/u.test(char)) continue;

        // Allow single space
        if (char === " ") continue;

        // Allow numbers if enabled (any script)
        if (allowNumbers && /\p{N}/u.test(char)) continue;

        // Allow special characters if enabled - expanded set
        if (allowSpecialChars) {
          // Common punctuation
          const commonPunctuation = `.,!?;:'"\\-_@#$%&*()+={}|[]<>/~\`^`;
          if (commonPunctuation.includes(char)) continue;

          // Ellipsis and other common symbols
          if ("…—–•·°©®™€£¥¢§¶†‡".includes(char)) continue;

          // Asian punctuation
          if ("。，、；：？！「」『』【】（）《》〈〉".includes(char)) continue;
        }

        // Allow newlines if enabled
        if (allowNewlines && (char === "\n" || char === "\r")) continue;

        // Block control characters, line/paragraph separators
        if (/[\p{C}\p{Zl}\p{Zp}]/u.test(char)) return false;

        // If we get here, character is not allowed
        return false;
      }

      return true;
    },
    {
      message: `${label} contains invalid characters`,
    },
  );

  return schema;
};
//   const {
//     min = 1,
//     max = 200,
//     label = "Text",
//     required = true,
//     allowNumbers = true,
//     allowSpecialChars = true,
//     allowNewlines = false,
//     trimWhitespace = true,
//   } = props;
//
//   let schema: z.ZodTypeAny = createStringSchema({ min, max, label, required });
//
//   if (trimWhitespace)
//     schema = (schema as z.ZodString).transform((v) => v.trim());
//
//   schema = (schema as z.ZodString).refine((val) => !/\s{2,}/.test(val), {
//     message: `${label} cannot contain consecutive spaces`,
//   });
//
//   // SIMPLE VALIDATION - Allow text in any language with basic restrictions
//   schema = (schema as z.ZodString).refine(
//     (val) => {
//       // Reject if contains control characters (except newlines if allowed)
//       const controlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;
//       if (controlChars.test(val)) return false;
//
//       // If newlines not allowed, check for them
//       if (!allowNewlines && /[\n\r]/.test(val)) return false;
//
//       // Check character by character
//       for (let i = 0; i < val.length; i++) {
//         const char = val[i];
//
//         // Allow letters from any language
//         if (/[\p{L}\p{M}]/u.test(char)) continue;
//
//         // Allow digits if enabled
//         if (allowNumbers && /\d/.test(char)) continue;
//
//         // Allow space
//         if (char === " ") continue;
//
//         // Allow newlines if enabled
//         if (allowNewlines && (char === "\n" || char === "\r")) continue;
//
//         // Allow common punctuation if enabled
//         if (allowSpecialChars) {
//           const allowedPunctuation = `.,!?;:'"\\-_@#$%&*()+={}|[]<>/`;
//           if (allowedPunctuation.includes(char)) continue;
//         }
//
//         // Character not allowed
//         return false;
//       }
//
//       return true;
//     },
//     {
//       message: `${label} contains invalid characters`,
//     },
//   );
//
//   return schema;
// };
/*                            Optional Schema Helper                          */
/* -------------------------------------------------------------------------- */

const optional = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal("")).nullable();

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export const validationSchemas = {
  createStringSchema,
  emailSchema,
  passwordSchema,
  nameSchema,
  usernameSchema,
  phoneSchema,
  urlSchema,
  numberSchema,
  textSchema,
  optional,
};

export type {
  BaseValidationProps,
  PasswordValidationProps,
  EmailValidationProps,
  PhoneValidationProps,
  UrlValidationProps,
  NumberValidationProps,
  TextValidationProps,
  NameValidationProps,
  UsernameValidationProps,
};
