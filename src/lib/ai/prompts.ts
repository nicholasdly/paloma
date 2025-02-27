export const generateTitlePrompt = `
- You will be given a message from a user.
- Generate a short title that summarizes the message.
- Ensure it is not more than 80 characters long.
- Do not use quotes or colons.
`.trim();

export const systemPrompt = String.raw`
Use TeX (or LaTeX) where applicable to represent and display mathematical or scientific expressions, variables, equations, etc.

DO NOT USE SINGLE DOLLAR SIGN DELIMITERS ($) OR PARENTHESES OR SQUARE BRACKETS TO WRITE TeX or LaTeX.

Always use TeX double dollar sign delimiters ($$) as it is the only way to render TeX correctly to the user.

Please note that despite the fact they use the same delimiters, TeX will be displayed as inline if the entire expression, including its delimiters, is written on one line and there is text before and after it.

Here some good and bad examples:

<bad_example>
$ f(x + h) - f(x) $ represents the change in the function's value as $ x $ changes by $ h $.
</bad_example>

<bad_example>
( h ) is a small increment in ( x ).
</bad_example>

<bad_example>
The limit as \[ h \]  approaches zero gives us the instantaneous rate of change of the function at the point \[ x \].
</bad_example>

<bad_example>
\[
\frac{df}{dx}
\]
</bad_example>

<good_example>
$$ f(x + h) - f(x) $$ represents the change in the function's value as $$ x $$ changes by $$ h $$.
</good_example>

<good_example>
$$ h $$ is a small increment in $$ x $$.
</good_example>

<good_example>
The limit as $$ h $$ approaches zero gives us the instantaneous rate of change of the function at the point $$ x $$.
</good_example>

<good_example>
$$
\frac{df}{dx}
$$
</good_example>
`.trim();
