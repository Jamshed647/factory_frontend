import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                               Base TypeDefs                                */
/* -------------------------------------------------------------------------- */

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

type NumberValidationProps = BaseValidationProps & {
  integerOnly?: boolean;
  positiveOnly?: boolean;
};

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

/* -------------------------------------------------------------------------- */
/*                                Email Schema                                */
/* -------------------------------------------------------------------------- */

const emailSchema = (props: EmailValidationProps = {}) => {
  const {
    label = "Email",
    required = true,
    allowPlus = true,
    allowMultipleDots = false,
    specificDomains,
    blockDomains,
  } = props;

  let schema = createStringSchema({ min: 5, max: 254, label, required });

  const basePattern = allowPlus
    ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/
    : /^[a-zA-Z0-9.!#$%&'*'=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;

  schema = schema.refine((val) => basePattern.test(val), {
    message: `${label} must be a valid email address`,
  });

  if (!allowMultipleDots) {
    schema = schema.refine((val) => !/\.{2,}/.test(val.split("@")[0]), {
      message: `${label} cannot contain multiple consecutive dots`,
    });
  }

  if (specificDomains?.length) {
    const domains = specificDomains.map((d) => d.toLowerCase());
    schema = schema.refine(
      (val) => domains.includes(val.split("@")[1]?.toLowerCase() || ""),
      { message: `${label} must be from: ${specificDomains.join(", ")}` },
    );
  }

  if (blockDomains?.length) {
    const blocked = blockDomains.map((d) => d.toLowerCase());
    schema = schema.refine(
      (val) => !blocked.includes(val.split("@")[1]?.toLowerCase() || ""),
      { message: `${label} from this domain is not allowed` },
    );
  }

  return schema.email({ message: `${label} must be a valid email address` });
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
    minNumbers = 1,
    minSpecialChars = 1,
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
/*                                 Name Schema                                */
/* -------------------------------------------------------------------------- */

const nameSchema = (props: NameValidationProps = {}) => {
  const {
    label = "Name",
    min = 2,
    max = 50,
    required = true,
    allowMultipleWords = true,
    allowAccents = true,
  } = props;

  let schema = createStringSchema({ min, max, label, required });

  const charPattern = allowAccents ? /^[A-Za-zÀ-ÿ .'-]+$/ : /^[A-Za-z .'-]+$/;

  schema = schema
    .refine((val) => charPattern.test(val), {
      message: `${label} can only contain letters, spaces, and common name characters`,
    })
    .refine((val) => !/\d/.test(val), {
      message: `${label} cannot contain numbers`,
    })
    .refine((val) => !/[@!#$%^&*()+=?/|{}[\]\\<>]/.test(val), {
      message: `${label} cannot contain special characters other than ., -, and '`,
    });

  if (allowMultipleWords) {
    schema = schema.refine((val) => val.trim().split(/\s+/).length >= 1, {
      message: `${label} must contain at least one word`,
    });
  } else {
    schema = schema.refine((val) => val.trim().split(/\s+/).length === 1, {
      message: `${label} must be a single word`,
    });
  }

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

  schema = (schema as z.ZodString).transform((val) =>
    val.replace(/[\s\-()]/g, ""),
  );

  if (countryCode === "required") {
    schema = (schema as z.ZodString).refine((val) => /^\+\d+$/.test(val), {
      message: `${label} must include country code (e.g., +1)`,
    });
  } else if (countryCode === "optional") {
    schema = (schema as z.ZodString).refine((val) => /^(\+?\d+)$/.test(val), {
      message: `${label} can only contain digits and optional +`,
    });
  } else {
    schema = (schema as z.ZodString).refine((val) => /^\d+$/.test(val), {
      message: `${label} can only contain digits`,
    });
  }

  if (allowedCountries?.length) {
    schema = (schema as z.ZodString).refine(
      (val) => {
        const code = val.startsWith("+") ? val.match(/^\+\d+/)?.[0] : undefined;
        return !code || allowedCountries.some((c) => c.startsWith(code));
      },
      {
        message: `${label} must be from allowed countries: ${allowedCountries.join(", ")}`,
      },
    );
  }

  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                  URL Schema                                */
/* -------------------------------------------------------------------------- */

const urlSchema = (props: UrlValidationProps = {}) => {
  const {
    label = "URL",
    required = true,
    requireHttps = false,
    allowedDomains,
    blockedDomains,
  } = props;

  let schema = createStringSchema({
    min: 5,
    max: 2048,
    label,
    required,
  }).refine(
    (val) => {
      try {
        const url = new URL(val);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    },
    {
      message: `${label} must be a valid URL`,
    },
  );

  if (requireHttps) {
    schema = schema.refine((val) => val.startsWith("https://"), {
      message: `${label} must use HTTPS`,
    });
  }

  if (allowedDomains?.length) {
    schema = schema.refine(
      (val) => {
        const domain = new URL(val).hostname;
        return allowedDomains.some((d) => domain.endsWith(d));
      },
      {
        message: `${label} must be from: ${allowedDomains.join(", ")}`,
      },
    );
  }

  if (blockedDomains?.length) {
    schema = schema.refine(
      (val) => {
        const domain = new URL(val).hostname;
        return !blockedDomains.some((d) => domain.endsWith(d));
      },
      {
        message: `${label} from this domain is not allowed`,
      },
    );
  }

  return schema.url({ message: `${label} must be a valid URL` });
};

/* -------------------------------------------------------------------------- */
/*                                 Number Schema                              */
/* -------------------------------------------------------------------------- */

const numberSchema = (props: NumberValidationProps = {}) => {
  const {
    label = "Number",
    required = true,
    min,
    max,
    integerOnly,
    positiveOnly,
  } = props;

  let schema = z
    .union([z.string(), z.number()])
    .transform((val) =>
      val === "" || val === null || val === undefined ? undefined : Number(val),
    )
    .refine((val) => val === undefined || !isNaN(val), {
      message: `${label} must be a valid number`,
    })
    .pipe(z.number({ message: `${label} must be a valid number` }));

  if (integerOnly)
    schema = schema.refine((v) => Number.isInteger(v), {
      message: `${label} must be an integer`,
    });
  if (positiveOnly)
    schema = schema.refine((v) => v >= 0, {
      message: `${label} must be positive`,
    });
  if (min !== undefined)
    schema = schema.refine((v) => v >= min, {
      message: `${label} must be at least ${min}`,
    });
  if (max !== undefined)
    schema = schema.refine((v) => v <= max, {
      message: `${label} must be at most ${max}`,
    });

  return required ? schema : schema.optional();
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

  if (trimWhitespace)
    schema = (schema as z.ZodString).transform((v) => v.trim());

  schema = (schema as z.ZodString).refine((val) => !/\s{2,}/.test(val), {
    message: `${label} cannot contain consecutive spaces`,
  });

  let pattern = "a-zA-Z";
  if (allowNumbers) pattern += "0-9";
  if (allowSpecialChars) pattern += ` .,!?;:'"\\-_@#$%&*()+={}|[\\]<>/\\\\`;
  if (allowNewlines) pattern += "\\n\\r";

  const regex = new RegExp(`^[${pattern}]*$`);

  schema = (schema as z.ZodString).refine((val) => regex.test(val), {
    message: `${label} contains invalid characters`,
  });

  return schema;
};

/* -------------------------------------------------------------------------- */
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
