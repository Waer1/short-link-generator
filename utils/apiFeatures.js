class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    const queryobj = { ...this.queryObj };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((ex) => delete queryobj[ex]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryobj);
    const advancedQueryobj = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(advancedQueryobj);
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  limit() {
    let limit = this.queryObj.limit;
    // 4)LIMIT
    if (this.queryObj.limit) {
      this.query = this.query.limit(limit);
    } else {
      limit = 5;
    }
    return this;
  }

  fields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v -_id');
    }
    return this;
  }

  paginate() {
    if (this.queryObj.page) {
      this.query = this.query
        .skip((this.queryObj.page - 1) * limit)
        .limit(limit);
    }
    return this;
  }
}

module.exports = APIFeatures;
