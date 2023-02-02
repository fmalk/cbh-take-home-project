const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";
const KEY_SIZE = 128;

/**
 * Hash an input
 *
 * @param data {any}
 * @returns {string}
 */
const hash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

/**
 * Extract candidate key
 *
 * @param event
 * @returns {*|string|null}
 */
const parseCandidate = (event) => {
  // check for null
  if (!event) return null;

  // check for partitionKey, return if present
  const { partitionKey } = event;
  if (partitionKey) return partitionKey;

  // use entire event as hash input for candidate
  const data = JSON.stringify(event);
  return hash(data);
}

/**
 * Check for an accepted, valid candidate
 *
 * @param candidate
 * @returns {string}
 */
const checkCandidate = (candidate) => {
  // trivial case
  if (!candidate) return TRIVIAL_PARTITION_KEY;
  let checked = candidate;

  // parse as string if needed
  if (typeof candidate !== "string") checked = JSON.stringify(candidate);

  // last check: do not larger keys than hash size
  if (checked.length > MAX_PARTITION_KEY_LENGTH) return hash(checked);

  return checked;
}

/**
 * Return a fixed partition key based on an event object
 *
 * @param event
 * @returns {string}
 */
const deterministicPartitionKey = (event) => {
  const candidate = parseCandidate(event);
  const checked = checkCandidate(candidate);
  return checked;
};

module.exports = {
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
  TRIVIAL_PARTITION_KEY,
  KEY_SIZE
}
