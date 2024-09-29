import { configure } from "@testing-library/react";

// Set default timeout for all queries
configure({ asyncUtilTimeout: 10000 });
