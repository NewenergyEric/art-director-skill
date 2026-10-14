/* Display text only. Both editions share game rules, asset IDs, and save data. */
(function (root) {
  'use strict';
  const english = /^en(?:-|$)/i.test(root.document?.documentElement.lang || 'zh');
  let messages = {};
  const format = (text, values) => text.replace(/\{(\d+)\}/g, (match, index) =>
    index < values.length ? String(values[index]) : match);
  root.GameLocale = {
    english,
    register: dictionary => { messages = dictionary; },
    text: (source, ...values) => format(english && Object.hasOwn(messages, source) ? messages[source] : source, values)
  };
})(globalThis);
