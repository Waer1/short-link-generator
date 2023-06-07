/**
 * APIFeatures Class
 * Provides utility methods for filtering, sorting, limiting, field selection, and pagination of queries.
 */
class APIFeatures {
  /**
   * Constructor
   * @param {Object} query - The initial query object.
   * @param {Object} queryObj - The query parameters object.
   */
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  /**
   * Filter Method
   * Applies basic and advanced filtering to the query.
   * @returns {Object} - The modified APIFeatures object.
   */
  filter() {
    const queryobj = { ...this.queryObj };
    const excludeFields = ["page", "sort", "limit", "fields"];

    // Exclude pagination, sorting, limiting, and field selection parameters from the query object
    excludeFields.forEach((ex) => delete queryobj[ex]);

    // Apply advanced filtering using MongoDB query operators
    let queryStr = JSON.stringify(queryobj);
    const advancedQueryobj = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    // Apply the advanced query object to the query
    this.query = this.query.find(advancedQueryobj);

    return this;
  }

  /**
   * Sort Method
   * Sorts the query results based on the provided sorting parameter.
   * If no sort parameter is provided, it sorts by 'createdAt' field by default.
   * @returns {Object} - The modified APIFeatures object.
   */
  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }

    return this;
  }

  /**
   * Limit Method
   * Limits the number of documents returned in the query results.
   * If no limit parameter is provided, it sets the limit to 5 by default.
   * @returns {Object} - The modified APIFeatures object.
   */
  limit() {
    let limit = this.queryObj.limit;

    if (this.queryObj.limit) {
      this.query = this.query.limit(limit);
    } else {
      limit = 5;
    }

    return this;
  }

  /**
   * Fields Method
   * Selects the specified fields to be included in the query results.
   * If no fields parameter is provided, it excludes '__v' and '_id' fields by default.
   * @returns {Object} - The modified APIFeatures object.
   */
  fields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v -_id");
    }

    return this;
  }

  /**
   * Paginate Method
   * Implements pagination by skipping and limiting the query results based on the provided page parameter.
   * @returns {Object} - The modified APIFeatures object.
   */
  paginate() {
    if (this.queryObj.page) {
      const limit = this.queryObj.limit || 5;
      this.query = this.query
        .skip((this.queryObj.page - 1) * limit)
        .limit(limit);
    }

    return this;
  }
}

module.exports = APIFeatures;
